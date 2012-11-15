YUI.add('grid-view', function (Y, name) {


  Y.namespace('Sights').GridView = Y.Base.create('gridview', Y.View, [], {

    events: {
      //'.eat': {click: 'eatSlice'}
    },

    groupTemplate: '<div class="grid-group {className}"><h2 class="item-title">{title}</h2></div>',

    itemTemplate: '<div class="item-container" data-modelid="{clientId}"><img src="{teaser}" width="200" height="150"></div>',

    initializer: function () {
      var modelList = this.get('modelList');

      // Re-render this view when the model changes, and destroy this view when
      // the model is destroyed.
      modelList.after('change', this.render, this);
      modelList.after('destroy', this.destroy, this);
    },

    // The render function is responsible for rendering the view to the page. It
    // will be called whenever the model changes.
    render: function () {

        if (!Y.one('.grid-view')) {
            var container = this.get('container'),
    gridContainer = this.groupTemplate,
    popularGrid = Y.Node.create(Y.Lang.sub(gridContainer, { className: 'popular', title: 'Popular' })),
    debutGrid = Y.Node.create(Y.Lang.sub(gridContainer, { className: 'debuts', title: 'Debuts' })),
    everyoneGrid = Y.Node.create(Y.Lang.sub(gridContainer, { className: 'everyone', title: 'Everyone' })),
    html = {
        popular: '',
        everyone: '',
        debuts: ''
    },
    list = this.get('modelList');

            list.each(function (model, index, list) {

                switch (model.get('group').key) {

                    case "everyone":
                        html.everyone += Y.Lang.sub(this.itemTemplate, {
                            teaser: model.get('teaser'),
                            clientId: model.get('clientId')
                        });
                        break;

                    case "debuts":
                        html.debuts += Y.Lang.sub(this.itemTemplate, {
                            teaser: model.get('teaser'),
                            clientId: model.get('clientId')
                        });
                        break;

                    case "popular":
                        html.popular += Y.Lang.sub(this.itemTemplate, {
                            teaser: model.get('teaser'),
                            clientId: model.get('clientId')
                        });
                        break;
                }
            }, this);


            popularGrid.appendChild(Y.Node.create(html.popular));
            everyoneGrid.appendChild(Y.Node.create(html.everyone));
            debutGrid.appendChild(Y.Node.create(html.debuts));

            container.appendChild(popularGrid);
            container.appendChild(everyoneGrid);
            container.appendChild(debutGrid);

            // Append the container element to the DOM if it's not on the page already.
            if (!container.inDoc()) {
                Y.one('.content').append(container);
            }

            this.fire('render');
            return this;
        }
    }
  }, {
    // Specify attributes and static properties for your View here.

    ATTRS: {
      // Override the default container attribute.
      container: {
          valueFn: function () {
              var container = Y.one('.grid-view');
              if (container) {
                  return container;
              }
              else {
                  return Y.Node.create('<div class="grid-view"></div>');
              }
        }
      }
    }
  });

}, '1.0',  { requires: ['view']});