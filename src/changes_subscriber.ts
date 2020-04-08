
/* IMPORT */

import {EMPTY_ARRAY} from './consts';
import Hooks from './hooks';
import Subscriber from './subscriber';
import Utils from './utils';
import {Store} from './types';

/* CHANGES SUBSCRIBER */

class ChangesSubscriber extends Subscriber<[string[]]> {

  /* VARIABLES */

  protected store: Store;
  protected paths: string[] | undefined;

  /* CONSTRUCTOR */

  constructor ( store: Store ) {

    super ();

    this.store = store;

  }

  /* API */

  schedule ( paths: string[] ): void {

    this.paths = this.paths ? this.paths.concat ( paths ) : paths;

    return super.schedule ();

  }

  trigger (): void {

    const paths = this.paths || EMPTY_ARRAY,
          roots = Utils.uniq ( Utils.paths.rootify ( paths ) );

    this.paths = undefined;

    Hooks.store.changeBatch.trigger ( this.store, paths, roots );

    super.trigger ( roots );

  }

}

/* EXPORT */

export default ChangesSubscriber;
