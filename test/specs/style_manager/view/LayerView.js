const LayerView = require('style_manager/view/LayerView');
const Layers = require('style_manager/model/Layers');

module.exports = {
  run() {

      describe('LayerView', () => {

        var component;
        var fixtures;
        var target;
        var model;
        var view;

        beforeEach(() => {
          var coll = new Layers();
          model = coll.add({});
          view = new LayerView({
            model
          });
          document.body.innerHTML = '<div id="fixtures"></div>';
          fixtures = document.body.firstChild;
          fixtures.appendChild(view.render().el);
        });

        after(() => {
          component = null;
          view = null;
          model = null;
        });

        it('Rendered correctly', () => {
          var layer = view.el;
          expect(fixtures.querySelector('.layer')).toExist();
          expect(layer.querySelector('#label')).toExist();
          expect(layer.querySelector('#close-layer')).toExist();
          expect(layer.querySelector('#inputs')).toExist();
          expect(layer.querySelector('#inputs').innerHTML).toNotExist();
          expect(layer.querySelector('#preview')).toExist();
        });

        it('getIndex returns default value', () => {
          expect(view.getIndex()).toEqual(0);
        });

        it('No preview', () => {
          var style = view.el.querySelector('#preview').style;
          expect(style.cssText).toNotExist();
        });

        it('Changes on value trigger onPreview', () => {
          var called = 0;
          view.onPreview = () => {called = 1};
          view.model.set('preview', true);
          view.model.set('value', 'test');
          expect(called).toEqual(1);
        });

        it('Update props', () => {
          view.model.set('props', $('<div>'));
          expect(view.el.querySelector('#inputs').innerHTML).toExist();
          expect(view.model.get('props')).toEqual(null);
        });

    });
  }
};
