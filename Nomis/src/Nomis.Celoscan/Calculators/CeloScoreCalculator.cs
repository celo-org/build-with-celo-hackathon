using Nomis.Blockchain.Abstractions;

namespace Nomis.Celoscan.Calculators
{
    /// <summary>
    /// Celo wallet score calculator.
    /// </summary>
    internal static class CeloScoreCalculator
    {
        private const double WalletAgePercents = 32.34 / 100;
        private const double BalancePercents = 26.88 / 100;
        private const double TotalTransactionsPercents = 9.99 / 100;
        private const double WalletTurnoverPercents = 16.31 / 100;
        private const double TokensHoldingPercents = 3.86 / 100;

        private static double WalletAgeScore(int walletAgeMonths)
        {
            return walletAgeMonths switch
            {
                < 1 => 7.14,
                < 12 => 36,
                < 24 => 60,
                _ => 100.0
            };
        }

        private static double BalanceScore(decimal balance)
        {
            return balance switch
            {
                < 0m => 7.7,
                < 0.2m => 23.05,
                < 0.4m => 22.23,
                < 0.7m => 65.98,
                _ => 100.0
            };
        }

        private static double TotalTransactionsScore(int transactions)
        {
            return transactions switch
            {
                < 1 => 3.72,
                < 10 => 7.16,
                < 100 => 13.57,
                < 1000 => 26.79,
                _ => 48.77
            };
        }

        private static double WalletTurnoverScore(decimal turnover)
        {
            return turnover switch
            {
                < 10 => 2.76,
                < 50 => 6.38,
                < 100 => 14.71,
                < 1000 => 33.27,
                _ => 60.07
            };
        }

        private static double TokensHoldingScore(int tokens)
        {
            return tokens switch
            {
                < 1 => 3.52,
                < 5 => 6.78,
                < 10 => 15.75,
                < 100 => 30.13,
                _ => 45.67
            };
        }

        /// <summary>
        /// Get wallet score.
        /// </summary>
        /// <param name="stats"><see cref="IWalletStats"/>.</param>
        /// <returns>Returns wallet score.</returns>
        public static double GetScore(this IWalletStats stats)
        {
            var result = 0.0;
            result += WalletAgeScore(stats.WalletAge) / 100 * WalletAgePercents;
            result += BalanceScore(stats.Balance) / 100 * BalancePercents;
            result += TotalTransactionsScore(stats.TotalTransactions) / 100 * TotalTransactionsPercents;
            result += WalletTurnoverScore(stats.WalletTurnover) / 100 * WalletTurnoverPercents;
            result += TokensHoldingScore(stats.TokensHolding) / 100 * TokensHoldingPercents;

            return result;
        }
    }
}