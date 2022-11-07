using System.Net;

namespace Nomis.Utils.Exceptions
{
    /// <summary>
    /// No data exception.
    /// </summary>
    public class NoDataException :
        CustomException
    {
        /// <summary>
        /// Initialize <see cref="NoDataException"/>.
        /// </summary>
        /// <param name="message">Exception message.</param>
        public NoDataException(string message)
            : base(message, statusCode: HttpStatusCode.BadRequest)
        {
        }
    }
}