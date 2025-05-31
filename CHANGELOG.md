# Changelog

## [1.1.0] - 2024-03-19

### Added
- Event system implementation
  - `on` method for adding event listeners
  - `off` method for removing event listeners
  - `once` method for one-time event listeners
  - `emit` method for triggering events
- IntersectionObserver API integration
- Support for multiple media types
  - Images
  - Videos
  - Iframes
  - Audio
  - Embed
  - Object
- State information for loading process
  - `waiting`: Element not yet visible
  - `loading`: Element is visible and loading
  - `loaded`: Element loaded successfully
  - `error`: Loading error occurred

### Changed
- Switched from Parcel to Rollup build system
- Added ES Modules support
- Improved code organization
  - Separated utils and config
  - Better file structure
- Updated build configuration
  - UMD format support
  - Terser plugin for minification
- Enhanced documentation
  - Complete README rewrite
  - Added usage examples
  - Added API documentation
  - Added CSS examples
- Updated package.json
  - Added dev dependencies
  - Updated scripts
  - Added module type
  - Updated keywords
  - Updated description

### Removed
- Old demo HTML file
- Old lazy.js implementation
- Old build system
- Unnecessary dependencies

### Fixed
- Event listener management
- Performance optimizations
- Error handling improvements

### Security
- Updated license year to 2025

## [1.0.5] - 2023-03-19

### Initial Release
- Basic lazy loading functionality
- Simple implementation
- Limited media support
- Basic documentation