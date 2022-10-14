using System.Numerics;

using Nomis.Utils.Extensions;

namespace Nomis.Blockchain.Abstractions.Calculators
{
    /// <summary>
    /// Blockchain wallet stats calculator.
    /// </summary>
    public interface IStatCalculator<out TWalletStats>
        where TWalletStats : IWalletStats
    {
        /// <summary>
        /// Get wallet age.
        /// </summary>
        /// <param name="timeStamps">Collection of timestamps.</param>
        /// <returns>Returns the wallet age (month).</returns>
        public static int GetWalletAge(
            IEnumerable<string?> timeStamps)
        {
            var firstTransaction = timeStamps.OrderBy(x => x).First(x => x != null);
            var age = firstTransaction == null ? 0 : (int)((DateTime.UtcNow - firstTransaction.ToDateTime()).TotalDays / 30);
            return age == 0 ? 1 : age;
        }

        /// <summary>
        /// Get transaction intervals.
        /// </summary>
        /// <param name="transactionDates">Collection of transaction dates.</param>
        /// <returns>Returns transaction intervals.</returns>
        public static IEnumerable<double> GetTransactionsIntervals(
            IEnumerable<DateTime> transactionDates)
        {
            var result = new List<double>();
            DateTime? lastDateTime = null;
            foreach (var transactionDate in transactionDates.OrderByDescending(x => x))
            {
                if (!lastDateTime.HasValue)
                {
                    lastDateTime = transactionDate;
                    continue;
                }

                var interval = Math.Abs((transactionDate - lastDateTime.Value).TotalHours);
                lastDateTime = transactionDate;
                result.Add(interval);
            }

            return result;
        }

        /// <summary>
        /// Get sum of transactions amount.
        /// </summary>
        /// <param name="transactionHashes">Collection of transaction hash.</param>
        /// <param name="internalTransactionsDatas">Collection of internal transaction data (transaction hash and amount).</param>
        /// <returns>Returns sum of transactions amount.</returns>
        public static BigInteger GetTokensSum(
            IEnumerable<string> transactionHashes,
            IEnumerable<(string Hash, BigInteger Amount)> internalTransactionsDatas)
        {
            var transactions = transactionHashes.ToHashSet();
            var result = new BigInteger();
            foreach (var data in internalTransactionsDatas.Where(x => transactions.Contains(x.Hash)))
            {
                result += data.Amount;
            }

            return result;
        }

        /// <summary>
        /// Get blockchain wallet stats.
        /// </summary>
        /// <returns>Returns wallet stats.</returns>
        public TWalletStats GetStats();
    }
}