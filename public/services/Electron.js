export class Electron {
  static electron() {
    if (process.env.ELECTRON) {
      return require('electron');
    }

    return null;
  }

  static async close() {
    const { remote } = await this.electron();

    remote.getCurrentWindow().close();
  }
}
