using System.Numerics;

namespace Nomis.Blockchain.Abstractions.Models
{
    /// <summary>
    /// Turnover intervals data.
    /// </summary>
    public class TurnoverIntervalsData
    {
        /// <summary>
        /// Initialize <see cref="TurnoverIntervalsData"/>.
        /// </summary>
        /// <param name="timeStamp">Transaction timestamp.</param>
        /// <param name="amount">Transaction amount value.</param>
        /// <param name="from">Is out transaction.</param>
        public TurnoverIntervalsData(
            DateTime timeStamp,
            BigInteger amount,
            bool from)
        {
            TimeStamp = timeStamp;
            Amount = amount;
            From = from;
        }

        /// <summary>
        /// Transaction timestamp.
        /// </summary>
        public DateTime TimeStamp { get; }

        /// <summary>
        /// Transaction amount value.
        /// </summary>
        public BigInteger Amount { get; }

        /// <summary>
        /// Is out transaction.
        /// </summary>
        public bool From { get; }
    }
}