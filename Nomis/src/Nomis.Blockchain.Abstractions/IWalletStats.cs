namespace Nomis.Blockchain.Abstractions
{
    /// <summary>
    /// Wallet stats.
    /// </summary>
    public interface IWalletStats
    {
        /// <summary>
        /// Wallet balance (Native token).
        /// </summary>
        public decimal Balance { get; set; }

        /// <summary>
        /// Wallet age (months).
        /// </summary>
        public int WalletAge { get; set; }

        /// <summary>
        /// Total transactions on wallet (number).
        /// </summary>
        public int TotalTransactions { get; set; }

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
        /// Value of all holding tokens (number).
        /// </summary>
        public int TokensHolding { get; set; }
    }
}