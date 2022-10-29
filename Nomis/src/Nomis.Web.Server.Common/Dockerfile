#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Nomis.Web.Server.Common/Nomis.Web.Server.Common.csproj", "src/Nomis.Web.Server.Common/"]
RUN dotnet restore "src/Nomis.Web.Server.Common/Nomis.Web.Server.Common.csproj"
COPY . .
WORKDIR "/src/src/Nomis.Web.Server.Common"
RUN dotnet build "Nomis.Web.Server.Common.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Nomis.Web.Server.Common.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nomis.Web.Server.Common.dll"]