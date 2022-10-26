using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

using Humanizer;

namespace Nomis.Blockchain.Abstractions.Models
{
    /// <summary>
    /// Property data.
    /// </summary>
    public class PropertyData
    {
        /// <summary>
        /// Initialize <see cref="PropertyData"/>.
        /// </summary>
        /// <param name="propertyInfo"><see cref="PropertyInfo"/>.</param>
        public PropertyData(
            PropertyInfo propertyInfo)
        {
            Label = propertyInfo.GetCustomAttribute<DisplayAttribute>()?.Name
                    ?? propertyInfo.Name.Humanize();
            Description = propertyInfo.GetCustomAttribute<DisplayAttribute>()?.Description
                          ?? propertyInfo.GetCustomAttribute<DescriptionAttribute>()?.Description
                          ?? propertyInfo.Name.Humanize();
            Units = propertyInfo.GetCustomAttribute<DisplayAttribute>()?.GroupName
                    ?? "unknown";
        }

        /// <summary>
        /// Initialize <see cref="PropertyData"/>.
        /// </summary>
        /// <param name="label">Property label.</param>
        /// <param name="description">Property description.</param>
        /// <param name="units">Units.</param>
        public PropertyData(
            string label,
            string description,
            string units)
        {
            Label = label;
            Description = description;
            Units = units;
        }

        /// <summary>
        /// Property label.
        /// </summary>
        public string? Label { get; }

        /// <summary>
        /// Property description.
        /// </summary>
        public string? Description { get; }

        /// <summary>
        /// Units.
        /// </summary>
        public string? Units { get; }
    }
}