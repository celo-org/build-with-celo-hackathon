namespace Nomis.Utils.Contracts.Properties
{
    /// <inheritdoc cref="IHasStatusCode{TPropertyType}"/>
    public interface IHasStatusCode :
        IHasStatusCode<int>
    {
    }

    /// <summary>
    /// Has property with name StatusCode.
    /// </summary>
    /// <typeparam name="TPropertyType">Тип свойства.</typeparam>
    public interface IHasStatusCode<TPropertyType> :
        IHasProperty
    {
        /// <summary>
        /// HTTP status code.
        /// </summary>
        TPropertyType StatusCode { get; set; }
    }
}