import PolyanetService from "./services/PolyanetService.js";
import MapService from "./services/MapService.js";
import SoloonService from "./services/SoloonService.js";
import ComethService from "./services/ComethService.js";

import { REQUEST_DELAY_MS, CANDIDATE_ID } from "./config.js";
import { sleep } from "./utils/sleep.js";

/**
 * Megaverse orchestration class
 *
 * Handles Phase 1 (drawing a Polyanet cross) and Phase 2
 * (building the Crossmint logo from a goal map) by calling
 * the underlying services for Polyanets, Soloons, and Comeths.
 */
export default class Megaverse {
    constructor() {
        this.polyanets = new PolyanetService(CANDIDATE_ID);
        this.soloons = new SoloonService(CANDIDATE_ID);
        this.comeths = new ComethService(CANDIDATE_ID);
        this.mapService = new MapService(CANDIDATE_ID);
    }

    /**
     * PHASE 1: Draw an "X" of Polyanets across an 11×11 grid.
     * Calculates diagonal coordinates programmatically
     * and creates a Polyanet at each position with delay
     * to avoid rate limits.
     *
     * Grid layout (rows 2–8):
     *   (2,2) ↖︎    ↗︎ (2,8)
     *   (3,3) ↖︎    ↗︎ (3,7)
     *   ...
     *   (8,2) ↖︎    ↗︎ (8,8)
     *
     * @returns {Promise<void>}
     */
    async phase1DrawCross() {
        const SIZE = 11;
        const START = 2;
        const END = SIZE - START - 1; // 8

        const coords = [];
        for (let r = START; r <= END; r++) {
            const c1 = r;
            const c2 = SIZE - 1 - r;
            coords.push([r, c1]);
            if (c2 !== c1) coords.push([r, c2]);
        }

        for (const [r, c] of coords) {
            try {
                await this.polyanets.create(r, c);
                console.log(`✅  (${r},${c})`);
            } catch (error) {
                console.error(`❌  (${r},${c})`, error.response?.data || error.message);
            }
            await sleep(REQUEST_DELAY_MS);
        }

        console.log("✨  Done Phase 1: Polyanet Cross");
    }

    /**
     * PHASE 2 helper: fetch the goal map JSON from the API.
     * @returns {Promise<{ goal: string[][] }>} Goal map with codes for each cell
     */
    async fetchGoalMap() {
        return this.mapService.getGoalMap();
    }

    /**
     * PHASE 2: Read the machine-readable goal map and
     * place Polyanets, Soloons, and Comeths accordingly.
     * Uses code identifiers in the JSON to determine which
     * service to call for each grid cell.
     *
     * Cell codes:
     * - "SPACE": empty cell (clear any existing entity)
     * - "POLYANET": place a Polyanet
     * - "<COLOR>_SOLOON": place a Soloon of specified color
     * - "<DIRECTION>_COMETH": place a Cometh facing direction
     *
     * @returns {Promise<void>}
     */
    async phase2FromGoalMap() {
        // 1) fetch the machine‐readable goal map
        const { goal } = await this.fetchGoalMap();

        // 2) iterate every row/column
        for (let r = 0; r < goal.length; r++) {
            for (let c = 0; c < goal[r].length; c++) {
                const code = goal[r][c];

                try {
                    switch (code) {
                        case "SPACE":
                            // delete if exists
                            await this.polyanets.delete(r, c);
                            console.log(`🌌  Empty cell at (${r},${c})`);
                            break;

                        case "POLYANET":
                            await this.polyanets.create(r, c);
                            console.log(`✅  Polyanet at (${r},${c})`);
                            break;

                        // any Soloon: e.g. "BLUE_SOLOON", "WHITE_SOLOON", etc.
                        default:
                            if (code.endsWith("_SOLOON")) {
                                // extract the color before the underscore
                                const color = code.split("_")[0].toLowerCase();
                                await this.soloons.create(r, c, color);
                                console.log(`✅  Soloon(${color}) at (${r},${c})`);
                            }
                            // any Cometh: e.g. "UP_COMETH", "RIGHT_COMETH", etc.
                            else if (code.endsWith("_COMETH")) {
                                const direction = code.split("_")[0].toLowerCase();
                                await this.comeths.create(r, c, direction);
                                console.log(`✅  Cometh(${direction}) at (${r},${c})`);
                            }
                            else {
                                throw new Error(`Unknown cell code “${code}” at (${r},${c})`);
                            }
                    }
                } catch (err) {
                    console.error(`❌  Failed ${code} at (${r},${c}):`, err.response?.data || err.message);
                }

                // 3) throttle between API calls
                await sleep(REQUEST_DELAY_MS);
            }
        }

        console.log("✨  Done Phase 2: Crossmint Logo");
    }

}