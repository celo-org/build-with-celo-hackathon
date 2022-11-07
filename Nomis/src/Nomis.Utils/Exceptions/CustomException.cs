using System.Globalization;
using System.Net;
using System.Runtime.Serialization;

namespace Nomis.Utils.Exceptions
{
    /// <summary>
    /// Custom exception.
    /// </summary>
    [Serializable]
    public class CustomException : 
        Exception
    {
        /// <summary>
        /// Initialize <see cref="CustomException"/>.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <param name="errors">Errors list.</param>
        /// <param name="statusCode">Http status code.</param>
        public CustomException(
            string message,
            List<string>? errors = default,
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
            : base(message)
        {
            ErrorMessages = errors;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initialize <see cref="CustomException"/>.
        /// </summary>
        /// <param name="message">Message.</param>
        /// <param name="errors">Errors list.</param>
        /// <param name="statusCode">Http status code.</param>
        /// <param name="args">Message args.</param>
        public CustomException(
            string message,
            List<string>? errors = default,
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError,
            params object[] args)
            : base(string.Format(CultureInfo.CurrentCulture, message, args))
        {
            ErrorMessages = errors;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initialize <see cref="CustomException"/> with serialization.
        /// </summary>
        /// <param name="info"><see cref="SerializationInfo"/>.</param>
        /// <param name="context"><see cref="StreamingContext"/>.</param>
        protected CustomException(SerializationInfo info, in StreamingContext context)
            : base(info, context)
        {
            ErrorMessages = (List<string>)info.GetValue(nameof(ErrorMessages), typeof(List<string>))!;
            StatusCode = (HttpStatusCode)(info.GetValue(nameof(StatusCode), typeof(HttpStatusCode)) ?? HttpStatusCode.InternalServerError);
        }

        /// <summary>
        /// Error message list.
        /// </summary>
        // ReSharper disable once MemberInitializerValueIgnored
        public List<string>? ErrorMessages { get; } = new();

        /// <summary>
        /// Http status code.
        /// </summary>
        public HttpStatusCode StatusCode { get; }

        /// <summary>
        /// Get serialized object data.
        /// </summary>
        /// <param name="info"><see cref="SerializationInfo"/>.</param>
        /// <param name="context"><see cref="StreamingContext"/>.</param>
        public override void GetObjectData(
            SerializationInfo info, 
            StreamingContext context)
        {
            base.GetObjectData(info, context);

            info.AddValue(nameof(ErrorMessages), ErrorMessages, typeof(List<string>));
            info.AddValue(nameof(StatusCode), StatusCode, typeof(HttpStatusCode));
        }
    }
}