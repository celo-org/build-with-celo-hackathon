using Microsoft.Extensions.DependencyInjection;
using Nomis.Utils.Contracts.Services;

namespace Nomis.Utils.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add transient application service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddTransientApplicationService<TService, TImplementation>(this IServiceCollection services)
            where TService : IApplicationService
            where TImplementation : TService, ITransientService
        {
            return services
                .AddTransient(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add scoped application service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddScopedApplicationService<TService, TImplementation>(this IServiceCollection services)
            where TService : IApplicationService
            where TImplementation : TService, IScopedService
        {
            return services
                .AddScoped(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add singleton application service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddSingletonApplicationService<TService, TImplementation>(this IServiceCollection services)
            where TService : IApplicationService
            where TImplementation : TService, ISingletonService
        {
            return services
                .AddSingleton(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add transient infrastructure service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddTransientInfrastructureService<TService, TImplementation>(this IServiceCollection services)
            where TService : IInfrastructureService
            where TImplementation : TService, ITransientService
        {
            return services
                .AddTransient(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add scoped infrastructure service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddScopedInfrastructureService<TService, TImplementation>(this IServiceCollection services)
            where TService : IInfrastructureService
            where TImplementation : TService, IScopedService
        {
            return services
                .AddScoped(typeof(TService), typeof(TImplementation));
        }

        /// <summary>
        /// Add singleton infrastructure service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddSingletonInfrastructureService<TService, TImplementation>(this IServiceCollection services)
            where TService : IInfrastructureService
            where TImplementation : TService, ISingletonService
        {
            return services
                .AddSingleton(typeof(TService), typeof(TImplementation));
        }
    }
}