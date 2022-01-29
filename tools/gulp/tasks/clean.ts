import { task, src, series } from "gulp";
import { source } from "../config";
import * as clean from "gulp-clean";
import * as deleteEmpty from "delete-empty";

/**
 * Cleans the build output assets from the packages folders
 */
function cleanOutput() {
	try{
		return src(
			[
			`${source}/**/dist/**/*.js`,
			`${source}/**/dist/**/*.d.ts`,
			`${source}/**/dist/**/*.js.map`,
			`${source}/**/dist/**/*.d.ts.map`
			],
			{
				read: false,
			}
		).pipe(clean());
	}catch(error){
		console.log("cleanOutput:error:", error)
	}

}

/**
 * Cleans empty dirs
 */
function cleanDirs(done: () => void) {
	deleteEmpty.sync(`${source}/`);
	done();
}

task("clean:output", cleanOutput);
task("clean:dirs", cleanDirs);
task("clean:bundle", series("clean:output", "clean:dirs"));
