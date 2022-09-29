using System.Text.Json.Serialization;

namespace Nomis.Celoscan.Interfaces.Models
{
    /// <summary>
    /// Celoscan account normal transaction.
    /// </summary>
    public class CeloscanAccountNormalTransaction :
        ICeloscanTransfer
    {
        /// <summary>
        /// Block number.
        /// </summary>
        [JsonPropertyName("blockNumber")]
        public string? BlockNumber { get; set; }

        /// <summary>
        /// Block hash.
        /// </summary>
        [JsonPropertyName("blockHash")]
        public string? BlockHash { get; set; }

        /// <summary>
        /// Time stamp.
        /// </summary>
        [JsonPropertyName("timeStamp")]
        public string? TimeStamp { get; set; }

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
        /// To address.
        /// </summary>
        [JsonPropertyName("to")]
        public string? To { get; set; }

        /// <summary>
        /// Value.
        /// </summary>
        [JsonPropertyName("value")]
        public string? Value { get; set; }

        /// <summary>
        /// Contract address.
        /// </summary>
        [JsonPropertyName("contractAddress")]
        public string? ContractAddress { get; set; }

        /// <summary>
        /// Is error.
        /// </summary>
        [JsonPropertyName("isError")]
        public string? IsError { get; set; }
    }
}
