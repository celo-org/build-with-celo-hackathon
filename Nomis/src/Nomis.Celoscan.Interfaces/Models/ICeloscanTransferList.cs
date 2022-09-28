using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Nomis.Celoscan.Interfaces.Models
{
    /// <summary>
    /// Celoscan transfer list.
    /// </summary>
    /// <typeparam name="TListItem">Celoscan transfer.</typeparam>
    public interface ICeloscanTransferList<TListItem>
        where TListItem : ICeloscanTransfer
    {
        /// <summary>
        /// List of transfers.
        /// </summary>
        [JsonPropertyName("result")]
        [DataMember(EmitDefaultValue = true)]
        public List<TListItem> Data { get; set; }
    }
}