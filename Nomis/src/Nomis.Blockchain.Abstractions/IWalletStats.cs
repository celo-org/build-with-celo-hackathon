using Nomis.Blockchain.Abstractions.Models;

namespace Nomis.Blockchain.Abstractions
{
    /// <summary>
    /// Wallet stats.
    /// </summary>
    /// <typeparam name="TTransactionIntervalData"><see cref="ITransactionIntervalData"/>.</typeparam>
    public interface IWalletStats<TTransactionIntervalData>
        where TTransactionIntervalData : class, ITransactionIntervalData
    {
        /// <summary>
        /// Wallet balance (Native token).
        /// </summary>
        public decimal Balance { get; set; }

        /// <summary>
        /// Wallet balance (USD).
        /// </summary>
        public decimal BalanceUSD { get; set; }

        /// <summary>
        /// Wallet age (months).
        /// </summary>
        public int WalletAge { get; set; }

        /// <summary>
        /// Total transactions on wallet (number).
        /// </summary>
        public int TotalTransactions { get; set; }

        /// <summary>
        /// Total rejected transactions on wallet (number).
        /// </summary>
        public int TotalRejectedTransactions { get; set; }

        /// <summary>
        /// Average time interval between transactions (hours).
        /// </summary>
        public double AverageTransactionTime { get; set; }

        /// <summary>
        /// Maximum time interval between transactions (hours).
        /// </summary>
        public double MaxTransactionTime { get; set; }

        /// <summary>
        /// Minimal time interval between transactions (hours).
        /// </summary>
        public double MinTransactionTime { get; set; }

        /// <summary>
        /// The movement of funds on the wallet (Native token).
        /// </summary>
        public decimal WalletTurnover { get; set; }

        /// <summary>
        /// The intervals of funds movements on the wallet.
        /// </summary>
        public IEnumerable<TTransactionIntervalData>? TurnoverIntervals { get; set; }

        /// <summary>
        /// The balance change value in the last month (Native token).
        /// </summary>
        public decimal BalanceChangeInLastMonth { get; set; }

        /// <summary>
        /// The balance change value in the last year (Native token).
        /// </summary>
        public decimal BalanceChangeInLastYear { get; set; }

        /// <summary>
        /// Total NFTs on wallet (number).
        /// </summary>
        public int NftHolding { get; set; }

        /// <summary>
        /// Time since last transaction (months).
        /// </summary>
        public int TimeFromLastTransaction { get; set; }

        /// <summary>
        /// NFT trading activity (Native token).
        /// </summary>
        public decimal NftTrading { get; set; }

        /// <summary>
        /// NFT worth on wallet (Native token).
        /// </summary>
        public decimal NftWorth { get; set; }

        /// <summary>
        /// Average transaction per months (number).
        /// </summary>
        public double TransactionsPerMonth { get; }

        /// <summary>
        /// Last month transactions (number).
        /// </summary>
        public int LastMonthTransactions { get; set; }

        /// <summary>
        /// Last year transactions on wallet (number).
        /// </summary>
        public int LastYearTransactions { get; set; }

        /// <summary>
        /// Value of all holding tokens (number).
        /// </summary>
        public int TokensHolding { get; set; }

        /// <summary>
        /// Wallet stats descriptions.
        /// </summary>
        public Dictionary<string, PropertyData> StatsDescriptions { get; }
    }
}