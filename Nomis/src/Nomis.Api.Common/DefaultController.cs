using Microsoft.AspNetCore.Mvc;

namespace Nomis.Api.Common
{
    /// <summary>
    /// Default controller for swagger redirect.
    /// </summary>
    [ApiExplorerSettings(IgnoreApi = true)]
    internal sealed class DefaultController :
        ControllerBase
    {
        /// <summary>
        /// Redirect to swagger.
        /// </summary>
        [Route("/")]
        [Route("/docs")]
        [Route("/swagger")]
        public IActionResult Index()
        {
            return new RedirectResult("~/swagger");
        }
    }
}