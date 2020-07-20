<?php
/**
 * Plugin with block that uses theme colors for color palette.
 *
 * @package   FlorianBrinkmann\ThemeColorPaletteInCustomBlock
 * @license   GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: Section block with color controls
 * Plugin URI:  
 * Version:     1.0.0
 * Author:      Florian Brinkmann
 * Author URI:  https://florianbrinkmann.com/en/
 * License:     GPL v2 http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: theme-color-palette-in-custom-block
 */

namespace FlorianBrinkmann\ThemeColorPaletteInCustomBlock;

/**
 * Register block script.
 */
add_action( 'init', function() {
	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'assets/js/editor.blocks.asset.php');
	
	wp_register_script(
		'theme-color-palette-in-custom-block-editor-script',
		plugins_url( 'assets/js/editor.blocks.js', __FILE__ ),
		$asset_file['dependencies'],
        $asset_file['version']
	);

	wp_register_style( 'theme-color-palette-in-custom-block-dummy-style', false );
} );

/**
 * Enqueue block script.
 */
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script( 'theme-color-palette-in-custom-block-editor-script' );

	wp_enqueue_style( 'theme-color-palette-in-custom-block-dummy-style' );

	// Adding small padding to block in backend so that the wrapper block can be selected.
	wp_add_inline_style( 'theme-color-palette-in-custom-block-dummy-style', '.wp-block-fbn-section-with-color{
		padding: 0.1em;
	}' );
} );
