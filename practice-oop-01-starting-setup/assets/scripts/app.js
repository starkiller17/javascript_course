class DOMHelper {
  static clearEventListener(element){
    // By clonning the element the event listeners are removed by the garbage collector
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);

    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if(hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  // this will refer to the class automatically
  detach() {
    if(this.element) {
      this.element.remove();
    }
  }
  
  attach() {
    // document.body.append(this.element);
    this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
  }
    
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text,hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);
    // tooltipElement.textContent = this.text;
    //tooltipElement.innerHTML = ``
    
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPoTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPoTop + hostElHeight - parentElementScrolling - 10;
    
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }

}

class ProjectItem {

  hasActiveTooltip = false;

  constructor(projectId, updateProjectListFunction, type) {
    this.id = projectId;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip( () => {
      this.hasActiveTooltip = false;
    }, tooltipText,
    this.id);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    let moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListener(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }

}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of projectItems) {
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), type));
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }
  
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update( this.switchProject.bind(this), this.type );
  }

  switchProject(projectId) {
    //const projectIndex = this.projects.findIndex(p => p.id === projectId);
    //this.projects.splice(projectIndex, 1);
    
    this.switchHandler(this.projects.find(p => p.id === projectId));
    // Returns all items but the one that is going to be dropped
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');

    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );

    const timerId = setTimeout(this.startAnalytics, 3000);

    const startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
      clearTimeout(timerId);
    });

    //this.startAnalytics();
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer= true;
    document.head.append(analyticsScript);
  }

}

App.init();

/* Simple solution without using OOP */
// const panels = document.querySelectorAll('section');
// const courses = document.querySelectorAll('li');
// const labels = [ 'Finish', 'Activate' ];
 
 
// courses.forEach(course => {
 
//   const [ tooltipButton, toggleButton ] = course.querySelectorAll('button');
 
//   tooltipButton.onclick = toggleTooltip;
//   toggleButton.onclick = moveCourse;
 
// });
 
 
// function toggleTooltip() {
  
//   if (this.dataset.tooltip === 'opened') return;
  
//   const tooltip = document.createElement('div');
//   tooltip.className = 'card';
//   tooltip.textContent = 'DUMMY!';
//   document.body.append(tooltip);
 
//   this.dataset.tooltip = 'opened';
  
//   tooltip.onclick = () => {
//     tooltip.remove();
//     this.dataset.tooltip = 'closed';
//   }
  
// }
 
 
// function moveCourse() {
 
//   const currentCourse = this.parentElement;
//   const targetIndex = panels[0].contains(currentCourse) ? 1 : 0;
 
//   this.textContent = labels[targetIndex];
//   const targetPanel = panels[targetIndex];
//   targetPanel.lastElementChild.append(currentCourse);
 
// }