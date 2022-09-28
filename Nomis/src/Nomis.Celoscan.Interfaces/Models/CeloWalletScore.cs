namespace Nomis.Celoscan.Interfaces.Models
{
    /// <summary>
    /// Celo wallet score.
    /// </summary>
    public class CeloWalletScore
    {
        /// <summary>
        /// Nomis Score in range of [0; 1].
        /// </summary>
        public double Score { get; set; }

        /// <summary>
        /// Additional stat data used in score calculations.
        /// </summary>
        public CeloWalletStats? Stats { get; set; }
    }
}