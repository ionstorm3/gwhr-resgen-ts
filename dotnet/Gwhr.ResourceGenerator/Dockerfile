FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Gwhr.ResourceGenerator/Gwhr.ResourceGenerator.csproj", "Gwhr.ResourceGenerator/"]
RUN dotnet restore "Gwhr.ResourceGenerator/Gwhr.ResourceGenerator.csproj"
COPY . .
WORKDIR "/src/Gwhr.ResourceGenerator"
RUN dotnet build "Gwhr.ResourceGenerator.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Gwhr.ResourceGenerator.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gwhr.ResourceGenerator.dll"]
