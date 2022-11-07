namespace Nomis.Utils.Wrapper
{
    /// <summary>
    /// Operation result.
    /// </summary>
    public interface IResult
    {
        /// <summary>
        /// Message list.
        /// </summary>
        List<string> Messages { get; set; }

        /// <summary>
        /// Operation is successed.
        /// </summary>
        bool Succeeded { get; init; }
    }

    /// <summary>
    /// Operation result with data.
    /// </summary>
    /// <typeparam name="TData">Data type.</typeparam>
    public interface IResult<TData> :
        IResult
    {
        /// <summary>
        /// Data.
        /// </summary>
        TData Data { get; init; }
    }
}