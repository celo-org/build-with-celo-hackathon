using System.Net;
using Nomis.Utils.Contracts.Properties;

namespace Nomis.Utils.Wrapper
{
    /// <inheritdoc cref="IResult"/>
    public record Result :
        IResult
    {
        /// <summary>
        /// Initialize <see cref="Result"/>.
        /// </summary>
        public Result()
        {
        }

        /// <inheritdoc/>
        public List<string> Messages { get; set; } = new();

        /// <inheritdoc/>
        /// <example>true</example>
        public bool Succeeded { get; init; }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Fail()
        {
            return new Result { Succeeded = false };
        }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Fail(string message)
        {
            return new Result { Succeeded = false, Messages = new() { message } };
        }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Fail(List<string> messages)
        {
            return new Result { Succeeded = false, Messages = messages };
        }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> FailAsync()
        {
            return Task.FromResult(Fail());
        }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> FailAsync(string message)
        {
            return Task.FromResult(Fail(message));
        }

        /// <summary>
        /// Fail operation result.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> FailAsync(List<string> messages)
        {
            return Task.FromResult(Fail(messages));
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Success()
        {
            return new Result { Succeeded = true };
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Success(string message)
        {
            return new Result { Succeeded = true, Messages = new() { message } };
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="IResult"/>.</returns>
        public static IResult Success(List<string> messages)
        {
            return new Result { Succeeded = true, Messages = messages };
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> SuccessAsync()
        {
            return Task.FromResult(Success());
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> SuccessAsync(string message)
        {
            return Task.FromResult(Success(message));
        }

        /// <summary>
        /// Success operation result.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{IResult}"/>.</returns>
        public static Task<IResult> SuccessAsync(List<string> messages)
        {
            return Task.FromResult(Success(messages));
        }
    }

    /// <summary>
    /// Error operation result.
    /// </summary>
    /// <typeparam name="T">Data type.</typeparam>
    public record ErrorResult<T> :
        Result<T>,
        IHasStatusCode
    {
        /// <summary>
        /// Error source.
        /// </summary>
        /// <example>Example Source</example>
        public string? Source { get; set; }

        /// <summary>
        /// Exception message.
        /// </summary>
        /// <example>Example Exception</example>
        public string? Exception { get; set; }

        /// <summary>
        /// Stack trace.
        /// </summary>
        /// <example>Example Stack Trace</example>
        public string? StackTrace { get; set; }

        /// <summary>
        /// Error identifier.
        /// </summary>
        public string? ErrorId { get; set; }

        /// <summary>
        /// Message for support team.
        /// </summary>
        public string? SupportMessage { get; set; }

        /// <inheritdoc/>
        public int StatusCode { get; set; }
    }

    /// <inheritdoc cref="IResult{TData}"/>
    public record Result<TData> :
        Result,
        IResult<TData>
    {
        /// <summary>
        /// Initialize <see cref="Result"/>.
        /// </summary>
#pragma warning disable CS8618
        public Result()
#pragma warning restore CS8618
        {
        }

        /// <inheritdoc/>
        public TData Data { get; init; }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Fail()
        {
            return new() { Succeeded = false };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Fail(string message)
        {
            return new() { Succeeded = false, Messages = new() { message } };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Fail(List<string> messages)
        {
            return new() { Succeeded = false, Messages = messages };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Fail(TData data)
        {
            return new() { Succeeded = false, Data = data };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Fail(TData data, string message)
        {
            return new() { Succeeded = false, Data = data, Messages = new() { message } };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Fail(TData data, List<string> messages)
        {
            return new() { Succeeded = false, Data = data, Messages = messages };
        }

        /// <summary>
        /// Ошибка с возвращаемыми данными.
        /// </summary>
        /// <returns>Returns <see cref="ErrorResult{T}"/>.</returns>
        public static ErrorResult<TData> ReturnError()
        {
            return new() { Succeeded = false, StatusCode = (int)HttpStatusCode.InternalServerError };
        }

        /// <summary>
        /// Ошибка с возвращаемыми данными.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="ErrorResult{T}"/>.</returns>
        public static ErrorResult<TData> ReturnError(string message)
        {
            return new() { Succeeded = false, Messages = new() { message }, StatusCode = (int)HttpStatusCode.InternalServerError };
        }

        /// <summary>
        /// Ошибка с возвращаемыми данными.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="ErrorResult{T}"/>.</returns>
        public static ErrorResult<TData> ReturnError(List<string> messages)
        {
            return new() { Succeeded = false, Messages = messages, StatusCode = (int)HttpStatusCode.InternalServerError };
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> FailAsync()
        {
            return Task.FromResult(Fail());
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> FailAsync(string message)
        {
            return Task.FromResult(Fail(message));
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> FailAsync(List<string> messages)
        {
            return Task.FromResult(Fail(messages));
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> FailAsync(TData data)
        {
            return Task.FromResult(Fail(data));
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> FailAsync(TData data, string message)
        {
            return Task.FromResult(Fail(data, message));
        }

        /// <summary>
        /// Fail operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> FailAsync(TData data, List<string> messages)
        {
            return Task.FromResult(Fail(data, messages));
        }

        /// <summary>
        /// Error result with data.
        /// </summary>
        /// <returns>Returns <see cref="Task{ErrorResult}"/>.</returns>
        public static Task<ErrorResult<TData>> ReturnErrorAsync()
        {
            return Task.FromResult(ReturnError());
        }

        /// <summary>
        /// Error result with data.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{ErrorResult}"/>.</returns>
        public static Task<ErrorResult<TData>> ReturnErrorAsync(string message)
        {
            return Task.FromResult(ReturnError(message));
        }

        /// <summary>
        /// Error result with data.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{ErrorResult}"/>.</returns>
        public static Task<ErrorResult<TData>> ReturnErrorAsync(List<string> messages)
        {
            return Task.FromResult(ReturnError(messages));
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Success()
        {
            return new() { Succeeded = true };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Success(string message)
        {
            return new() { Succeeded = true, Messages = new() { message } };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static new Result<TData> Success(List<string> messages)
        {
            return new() { Succeeded = true, Messages = messages };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Success(TData data)
        {
            return new() { Succeeded = true, Data = data };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Success(TData data, string message)
        {
            return new() { Succeeded = true, Data = data, Messages = new() { message } };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Result{T}"/>.</returns>
        public static Result<TData> Success(TData data, List<string> messages)
        {
            return new() { Succeeded = true, Data = data, Messages = messages };
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> SuccessAsync()
        {
            return Task.FromResult(Success());
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> SuccessAsync(string message)
        {
            return Task.FromResult(Success(message));
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static new Task<Result<TData>> SuccessAsync(List<string> messages)
        {
            return Task.FromResult(Success(messages));
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> SuccessAsync(TData data)
        {
            return Task.FromResult(Success(data));
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="message">Message.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> SuccessAsync(TData data, string message)
        {
            return Task.FromResult(Success(data, message));
        }

        /// <summary>
        /// Success operation result with data.
        /// </summary>
        /// <param name="data">Data.</param>
        /// <param name="messages">Message list.</param>
        /// <returns>Returns <see cref="Task{Result}"/>.</returns>
        public static Task<Result<TData>> SuccessAsync(TData data, List<string> messages)
        {
            return Task.FromResult(Success(data, messages));
        }
    }
}