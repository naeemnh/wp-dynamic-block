import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
registerBlockType("block-template/dynamic-block", {
	edit: Edit,

	save,
});
