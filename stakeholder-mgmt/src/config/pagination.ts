export class Pagination {
  private validCurrentPage: boolean;
  public currentPage: number;
  private totalItems: number;
  public itemsPerPage: number;
  public totalPages: number;
  private previousPage: number | boolean;
  private nextPage: number | boolean;
  private lastPage: number;
  private skip: number;
  public lastItem: Array<any>;

  constructor({currentPage, totalItems, itemsPerPage}: Record<string, number>) {
    this.validCurrentPage = false; // change to true at _setCurrentPage() if is ok
    this.currentPage = this._setCurrentPage(currentPage);
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage || 1000; // default 10 items per page
    this.totalPages = this._setTotalPages();
    this.previousPage = this.getPreviousPage();
    this.nextPage = this.getNextPage();
    this.lastPage = this.getLastPage();
    this.skip = this.getSkip();
  }

  _setCurrentPage(currentPage: number) {
    if (currentPage < 1 || isNaN(currentPage)) {
      return 1;
    } else if (currentPage > this.totalPages) {
      return this.totalPages;
    } else {
      this.validCurrentPage = true;
      return currentPage;
    }
  }

  _setTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPreviousPage() {
    if (this.currentPage <= 1) {
      return false;
    }
    return this.currentPage - 1;
  }

  getNextPage() {
    if (this.currentPage >= this.totalPages) {
      return false;
    }
    return this.currentPage + 1;
  }

  getLastPage() {
    return this.totalPages;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getSkip() {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  getTotalPages() {
    return this.totalPages;
  }

  checkIfValidCurrentPage() {
    return this.validCurrentPage;
  }
}
