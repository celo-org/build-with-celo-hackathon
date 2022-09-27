namespace Nomis.Utils.Extensions
{
    /// <summary>
    /// Extension methods for converting DateTime.
    /// </summary>
    public static class DateTimeExtensions
    {
        /// <summary>
        /// Convert Unix TimeStamp to DateTime.
        /// </summary>
        /// <param name="unixTimeStamp">Unix TimeStamp in string.</param>
        /// <returns><see cref="DateTime"/>.</returns>
        public static DateTime ToDateTime(this string unixTimeStamp)
        {
            var unixTimeStampLong = long.Parse(unixTimeStamp);
            var dateTimeOffSet = DateTimeOffset.FromUnixTimeSeconds(unixTimeStampLong);
            return dateTimeOffSet.DateTime;
        }
    }
}