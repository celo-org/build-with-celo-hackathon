using Swashbuckle.AspNetCore.Filters;

namespace Nomis.Api.Common.Swagger.Examples
{
    /// <summary>
    /// Example response for Ping action.
    /// </summary>
    public class PingResponseExample : IExamplesProvider<object>
    {
        /// <inheritdoc/>
        public object GetExamples()
        {
            return "Ok";
        }
    }
}