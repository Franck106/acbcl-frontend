class ActivityApi {

    private path = 'activity'

    async getAllActivities() {
        const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}`);
        return res.json();
    }
}

export default ActivityApi;