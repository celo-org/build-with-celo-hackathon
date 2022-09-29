using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Nomis.Celoscan.Interfaces.Models
{
    /// <summary>
    /// Celoscan account ERC-20 token transfer events.
    /// </summary>
    public class CeloscanAccountERC20TokenEvents :
        ICeloscanTransferList<CeloscanAccountERC20TokenEvent>
    {
        /// <summary>
        /// Status.
        /// </summary>
        [JsonPropertyName("status")]
        public int Status { get; set; }

        /// <summary>
        /// Message.
        /// </summary>
        [JsonPropertyName("message")]
        public string? Message { get; set; }

        /// <summary>
        /// Account ERC-20 token event list.
        /// </summary>
        [JsonPropertyName("result")]
        [DataMember(EmitDefaultValue = true)]
        public List<CeloscanAccountERC20TokenEvent> Data { get; set; } = new();
    }
}