using Nomis.Utils.Contracts.Common;

namespace Nomis.Blockchain.Abstractions.Settings
{
    /// <summary>
    /// API visibility settings.
    /// </summary>
    public class ApiVisibilitySettings
        : ISettings
    {
        /// <summary>
        /// Celo API is enabled.
        /// </summary>
        public bool CeloAPIEnabled { get; set; }
    }
}