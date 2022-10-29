using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Coingecko.Interfaces;
using Nomis.Coingecko.Interfaces.Settings;
using Nomis.Utils.Extensions;

namespace Nomis.Coingecko.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add Coingecko service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddCoingeckoService(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSettings<CoingeckoSettings>(configuration);
            return services
                    .AddSingletonInfrastructureService<ICoingeckoService, CoingeckoService>();
        }
    }
}