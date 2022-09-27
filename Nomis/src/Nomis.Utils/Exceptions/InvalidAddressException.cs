using System.Net;

namespace Nomis.Utils.Exceptions
{
    /// <summary>
    /// Invalid address exception.
    /// </summary>
    public class InvalidAddressException :
        CustomException
    {
        /// <summary>
        /// Initialize <see cref="InvalidAddressException"/>.
        /// </summary>
        /// <param name="message">Exception message.</param>
        public InvalidAddressException(string message) 
            : base(message, statusCode: HttpStatusCode.BadRequest)
        {
        }
    }
}