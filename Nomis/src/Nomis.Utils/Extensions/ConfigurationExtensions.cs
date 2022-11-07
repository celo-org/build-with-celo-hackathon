using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Utils.Contracts.Common;

namespace Nomis.Utils.Extensions
{
    /// <summary>
    /// <see cref="IConfiguration"/> extension methods.
    /// </summary>
    public static class ConfigurationExtensions
    {
        /// <summary>
        /// Get <see cref="ISettings"/> for <typeparamref name="TSettings"/> type.
        /// </summary>
        /// <typeparam name="TSettings">Type for storing settings.</typeparam>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <param name="sectionName">Configuration section name.</param>
        /// <returns>Returns settings got from configuration.</returns>
        public static TSettings GetSettings<TSettings>(
            this IConfiguration configuration,
            string? sectionName = null)
            where TSettings : class, ISettings, new()
        {
            var section = configuration.GetSection(string.IsNullOrWhiteSpace(sectionName)
                ? typeof(TSettings).Name
                : sectionName);
            var settings = new TSettings();
            section.Bind(settings);

            return settings;
        }

        /// <summary>
        /// Add <see cref="ISettings"/> for <typeparamref name="TSettings"/> type.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <param name="sectionName">Configuration section name.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddSettings<TSettings>(
            this IServiceCollection services,
            IConfiguration configuration,
            string? sectionName = null)
            where TSettings : class, ISettings, new()
        {
            return services
                .Configure<TSettings>(configuration.GetSection(string.IsNullOrWhiteSpace(sectionName)
                    ? typeof(TSettings).Name
                    : sectionName));
        }
    }
}