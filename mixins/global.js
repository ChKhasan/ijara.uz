export default {
  data() {
    return {
      page: 1,
      current: 1,
      params: {
        page: 1,
        pageSize: 6,
      },
      value: "",
    };
  },
  methods: {
    async changePagination(val) {
      if (this.$route.query.page != val) {
        await this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: val,
          },
        });
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    async getFirstData() {
      if (
        !Object.keys(this.$route.query).includes("page") ||
        !Object.keys(this.$route.query).includes("page_size")
      ) {
        await this.$router.replace({
          path: this.$route.path,
          query: { page: this.params.page, page_size: this.params.pageSize },
        });
      }
      this.params.pageSize = Number(this.$route.query.page_size);
      this.current = Number(this.$route.query.page);
    },
  },
};
