import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";
/**
 * Change: block-boilerplate
 */
export default function Edit() {
	return (
		<p {...useBlockProps()}>
			{__("Block Boilerplate – hello from the editor!", "block-boilerplate")}
		</p>
	);
}
