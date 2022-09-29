using System.Text.Json.Serialization;

namespace Nomis.Celoscan.Interfaces.Models
{
    /// <summary>
    /// Celoscan account NFT token event.
    /// </summary>
    public interface ICeloscanAccountNftTokenEvent
    {
        /// <summary>
        /// Hash.
        /// </summary>
        [JsonPropertyName("hash")]
        public string? Hash { get; set; }

        /// <summary>
        /// From address.
        /// </summary>
        [JsonPropertyName("from")]
        public string? From { get; set; }

        /// <summary>
        /// Contract address.
        /// </summary>
        [JsonPropertyName("contractAddress")]
        public string? ContractAddress { get; set; }

        /// <summary>
        /// To address.
        /// </summary>
        [JsonPropertyName("to")]
        public string? To { get; set; }

        /// <summary>
        /// Token identifier.
        /// </summary>
        [JsonPropertyName("TokenID")]
        public string? TokenId { get; set; }
    }
}