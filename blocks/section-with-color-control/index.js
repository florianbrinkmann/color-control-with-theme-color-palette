/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;
const { 
	registerBlockType,
} = wp.blocks;
const {
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
	getColorObjectByColorValue,
	getColorClassName
} = wp.blockEditor;
const {
	Fragment,
} = wp.element;

registerBlockType( 'fbn/section-with-color', {
	title: __( 'Section with color controls', 'theme-color-palette-in-custom-block' ),
	category: 'layout',
	attributes: {
		color: {
			type: 'string',
			default: '',
		},
		backgroundColor: {
			type: 'string',
			default: ''
		}
	},
	edit: props => {
		const {
			attributes,
			setAttributes,
			className,
		} = props;
	
		const {
			color,
			backgroundColor,
		} = attributes;

		let textColorClassName = '',
			themeColors = [];

		const settings = wp.data.select( 'core/block-editor' ).getSettings();
		if ( settings && settings.colors ) {
			themeColors = settings.colors;
		}

		if ( color !== '' ) {
			// Generate text color class name.
			const currentColorObj = getColorObjectByColorValue( themeColors, color );

			if ( currentColorObj !== undefined ) {
				textColorClassName = getColorClassName( 'color', currentColorObj.slug );
			}
		}

		let backgroundColorClassName = '';
		if ( backgroundColor !== '' ) {
			// Generate text color class name.
			const currentBackgroundColorObj = getColorObjectByColorValue( themeColors, backgroundColor );

			if ( currentBackgroundColorObj !== undefined ) {
				backgroundColorClassName = getColorClassName( 'background-color', currentBackgroundColorObj.slug );
			}
		}

		return (
			<div className={ `${className} ${textColorClassName} ${backgroundColorClassName} ${backgroundColorClassName !== '' ? 'has-background-color' : ''}` }>
				<Fragment>
					<InspectorControls>
						<PanelColorSettings 
							title={ __( 'Color settings', 'theme-color-palette-in-custom-block' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									label: __( 'Text color', 'theme-color-palette-in-custom-block' ),
									value: color,
									onChange: ( color ) => setAttributes( { color } ),
									disableCustomColors: true
								},
								{
									label: __( 'Background color', 'theme-color-palette-in-custom-block' ),
									value: backgroundColor,
									onChange: ( backgroundColor ) => setAttributes( { backgroundColor } ),
									disableCustomColors: true
								}
							] }
						/>
					</InspectorControls>
					<InnerBlocks />
				</Fragment>
			</div>
		);
	},
	save: ( { attributes } ) => {
		const {
			color,
			backgroundColor,
		} = attributes;

		let textColorClassName = '',
			themeColors = [];

		const settings = wp.data.select( 'core/block-editor' ).getSettings();
		if ( settings && settings.colors ) {
			themeColors = settings.colors;
		}

		if ( color !== '' ) {
			// Generate text color class name.
			const currentColorObj = getColorObjectByColorValue( themeColors, color );

			if ( currentColorObj !== undefined ) {
				textColorClassName = getColorClassName( 'color', currentColorObj.slug );
			}
		}

		let backgroundColorClassName = '';
		if ( backgroundColor !== '' ) {
			// Generate text color class name.
			const currentBackgroundColorObj = getColorObjectByColorValue( themeColors, backgroundColor );

			if ( currentBackgroundColorObj !== undefined ) {
				backgroundColorClassName = getColorClassName( 'background-color', currentBackgroundColorObj.slug );
			}
		}

		return (
			<div className={ `${ textColorClassName } ${ backgroundColorClassName } ${backgroundColorClassName !== '' ? 'has-background-color' : ''} `}>
				<InnerBlocks.Content />
			</div>
		);
	}
} )
