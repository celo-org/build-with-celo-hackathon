using System.Reflection;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Nomis.Blockchain.Abstractions.Settings;

namespace Nomis.Api.Common.Providers
{
    /// <summary>
    /// A provider to check if the type is a controller.
    /// </summary>
    public class InternalControllerFeatureProvider :
        ControllerFeatureProvider
    {
        /// <summary>
        /// Controller name suffix.
        /// </summary>
        private const string ControllerSuffix = "Controller";

        private readonly ApiVisibilitySettings _apiVisibilitySettings;

        /// <summary>
        /// Initialize <see cref="InternalControllerFeatureProvider"/>.
        /// </summary>
        /// <param name="apiVisibilitySettings"><see cref="ApiVisibilitySettings"/>.</param>
        public InternalControllerFeatureProvider(
            ApiVisibilitySettings apiVisibilitySettings)
        {
            _apiVisibilitySettings = apiVisibilitySettings;
        }

        /// <inheritdoc/>
        protected override bool IsController(TypeInfo typeInfo)
        {
            if (!typeInfo.IsClass)
            {
                return false;
            }

            if (typeInfo.IsAbstract)
            {
                return false;
            }

            if (typeInfo.ContainsGenericParameters)
            {
                return false;
            }

            if (typeInfo.IsDefined(typeof(NonControllerAttribute)))
            {
                return false;
            }

            if (!typeInfo.Name.EndsWith(ControllerSuffix, StringComparison.OrdinalIgnoreCase) &&
                !typeInfo.IsDefined(typeof(ControllerAttribute)))
            {
                return false;
            }

            return ControllerIsEnabled(typeInfo.Name);
        }

        private bool ControllerIsEnabled(string controllerName)
        {
            return controllerName switch
            {
                "CeloController" => _apiVisibilitySettings.CeloAPIEnabled,
                nameof(DefaultController) => true,
                _ => false
            };
        }
    }
}