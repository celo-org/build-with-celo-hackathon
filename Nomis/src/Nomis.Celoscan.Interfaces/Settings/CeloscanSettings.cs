using Nomis.Utils.Contracts.Common;

namespace Nomis.Celoscan.Interfaces.Settings
{
    /// <summary>
    /// Celoscan settings.
    /// </summary>
    public class CeloscanSettings :
        ISettings
    {
        /// <summary>
        /// API key for celoscan.
        /// </summary>
        public string? ApiKey { get; set; }

        /// <summary>
        /// API base URL.
        /// </summary>
        /// <remarks>
        /// <see href="https://celoscan.io/apis"/>
        /// </remarks>
        public string? ApiBaseUrl { get; set; }
    }
}