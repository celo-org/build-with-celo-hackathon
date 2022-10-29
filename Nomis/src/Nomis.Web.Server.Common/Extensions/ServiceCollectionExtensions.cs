using Nomis.Celoscan.Extensions;
using Nomis.Coingecko.Extensions;

namespace Nomis.Web.Server.Common.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add blockchain services.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddBlockchainServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                .AddCoingeckoService(configuration)
                .AddCeloscanService(configuration);
        }
    }
}
