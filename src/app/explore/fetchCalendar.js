export async function fetchAvailability(url) {
    try {
        const res = await fetch(`/api/calendar?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        return Array.isArray(data) ? data : []; // FIX: Use array directly
    } catch (error) {
        console.error("Error fetching availability:", error);
        return [];
    }
}