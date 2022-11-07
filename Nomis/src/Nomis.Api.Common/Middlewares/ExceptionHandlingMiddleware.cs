using System.Net;
using System.Net.Mime;
using System.Text.Json;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Nomis.Utils.Exceptions;
using Nomis.Utils.Wrapper;

namespace Nomis.Api.Common.Middlewares
{
    /// <summary>
    /// Global exception handler middleware.
    /// </summary>
    public class ExceptionHandlingMiddleware :
        IMiddleware
    {
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        /// <summary>
        /// Initialize <see cref="ExceptionHandlingMiddleware"/>.
        /// </summary>
        /// <param name="env"><see cref="IHostEnvironment"/>.</param>
        /// <param name="logger"><see cref="ILogger{T}"/>.</param>
        public ExceptionHandlingMiddleware(
            IHostEnvironment env,
            ILogger<ExceptionHandlingMiddleware> logger)
        {
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <inheritdoc/>
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception exception)
            {
                var response = context.Response;
                response.ContentType = MediaTypeNames.Application.Json;

                if (exception is not CustomException && exception.InnerException != null)
                {
                    while (exception.InnerException != null)
                    {
                        exception = exception.InnerException;
                    }
                }

                string errorId = Guid.NewGuid().ToString();

                var responseModel = await ErrorResult<string>.ReturnErrorAsync(exception.Message);
                responseModel.Exception = exception.Message.Trim();
                responseModel.ErrorId = errorId;
                responseModel.SupportMessage = "Provide the ErrorId to the support team for further analysis.";
                try
                {
                    if (_env.IsDevelopment())
                    {
                        responseModel.Source = exception.TargetSite?.DeclaringType?.FullName?.Trim();
                        int? pos = exception.StackTrace?.IndexOf(Environment.NewLine);
                        responseModel.StackTrace = exception.StackTrace?.Trim()
                            .Substring(0, pos != null ? (int)pos - 3 : exception.StackTrace?.Trim().Length ?? 0).Trim() ?? string.Empty;
                    }
                }
                catch
                {
                    // ignored
                }

                switch (exception)
                {
                    // TODO - add specific exceptions

                    case CustomException e:
                        _logger.LogWarning(e, exception.Message);
                        response.StatusCode = responseModel.StatusCode = (int)e.StatusCode;
                        if (e.ErrorMessages != null && e.ErrorMessages.Count != 0)
                        {
                            responseModel.Messages.AddRange(e.ErrorMessages);
                        }

                        break;

                    default:
                        _logger.LogCritical(exception, exception.Message);
                        response.StatusCode = responseModel.StatusCode = (int)HttpStatusCode.InternalServerError;
                        responseModel.Messages = new() { "An error has occurred" };
                        break;
                }

                string result = JsonSerializer.Serialize(responseModel, new JsonSerializerOptions
                {
                    DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                await response.WriteAsync(result);
            }
        }
    }
}