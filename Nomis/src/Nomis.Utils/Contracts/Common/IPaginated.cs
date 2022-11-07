namespace Nomis.Utils.Contracts.Common
{
    /// <summary>
    /// Paginated.
    /// </summary>
    public interface IPaginated
    {
        /// <summary>
        /// Current page number.
        /// </summary>
        public int PageNumber { get; }

        /// <summary>
        /// Count of data per page.
        /// </summary>
        public int PageSize { get; }
    }
}