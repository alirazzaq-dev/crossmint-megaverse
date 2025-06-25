import Megaverse from "./Megaverse.js";

/**
 * Entry point: orchestrates Phase 1 and Phase 2, handling any top-level errors.
 */
(async () => {
    const mv = new Megaverse();
    try {
        await mv.phase2FromGoalMap();
        // await mv.phase1DrawCross();
    } catch (err) {
        console.error("Fatal error:", err);
        process.exit(1);
    }
})();
