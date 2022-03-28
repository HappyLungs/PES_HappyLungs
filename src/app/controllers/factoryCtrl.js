import domainCtrl from  "../domainLayer/DomainCtrl.js"
import PersistenceCtrl from "../persistenceLayer/PersistenceCtrl.js"
import PresentationCtrl from "../presentationLayer/PresentationCtrl.js"

let factory = (function () {
    let instance;
    return function () {
        if (instance) return instance;
        instance = this;
        // initialize any properties of the singleton
        this.persistenceCtrl = new PersistenceCtrl();
        this.domainCtrl = new domainCtrl();
        this.presentationCtrl = new PresentationCtrl();
    }
}());

export default factory;