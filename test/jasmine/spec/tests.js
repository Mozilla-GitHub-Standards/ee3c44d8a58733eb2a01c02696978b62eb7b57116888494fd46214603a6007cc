
describe("web-components ", function() {

	it('document.register should exist', function(){
		var componentsLoaded = false;
		document.addEventListener('DOMComponentsLoaded', function(){
			componentsLoaded = true;
		});

		runs(function(){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = '../../document.register.js?d=' + new Date().getTime();
			document.getElementsByTagName('head')[0].appendChild(script);
		});

		waitsFor(function() {
			return componentsLoaded;
		}, "The document should be loaded", 1000);
		
		runs(function() {
			expect(document.register).toBeDefined();
		});
	});

	it('should fire created lifecycle event', function(){
		var created = false;
		document.register('x-foo', {
			lifecycle:{
				created: function(proto){
					created = true;
				}
			}
		});

		var foo = document.createElement('x-foo');

		waitsFor(function(){
			return created;
		}, "created should fire for new tag", 1000);

		runs(function(){
			expect(created).toEqual(true);
		});
		
	});

	

	describe('using testbox', function(){
		var testBox;

		beforeEach(function(){
			testBox = document.getElementById('testbox');			
		});

		afterEach(function(){
			testBox.innerHTML = "";
		});	

		it('testbox should exist', function(){
			expect(testBox).toBeDefined();
		});

		it('should fire inserted lifecycle event when inserted', function(){

			var inserted = false;
			document.register('x-foo', {
				lifecycle:{
					inserted: function(){
						inserted = true;
					}
				}
			});

			var foo = document.createElement('x-foo');
			testBox.appendChild(foo);

			waitsFor(function(){
				return inserted;
			}, "inserted should fire", 1000);

			runs(function(){
				expect(inserted).toEqual(true);
				expect(document.getElementById('foo')).toBeDefined();
				
			});
		});

		it('should fire removed lifecycle event when removed', function(){

			var removed = false;
			document.register('x-foo', {
				lifecycle:{
					removed: function(){
						removed = true;
					}
				}
			});

			var foo = document.createElement('x-foo');
			testBox.appendChild(foo);

			waitsFor(function(){
				return removed;
			}, "removed should fire", 1000);

			runs(function(){
				expect(removed).toEqual(true);
				expect(document.getElementById('foo')).toBeNull();
				
			});
		});

		it('should fire attributeChanged lifecycle event', function(){

			var changed = false;
			document.register('x-foo', {
				lifecycle:{
					attributeChanged: function(attr, value){
						if (attr == 'bar' && value=='baz'){
							changed = true;
						}
					}
				}
			});

			var foo = document.createElement('x-foo');
			testBox.appendChild(foo);
			foo.setAttribute('bar','baz');

			waitsFor(function(){
				return changed;
			}, "changed should fire", 1000);

			runs(function(){
				expect(changed).toEqual(true);
			});
			
		});

		it('', function(){

		});

		it('should fire inserted lifecycle event when set via innerHTML', function(){

			var inserted = false;
			document.register('x-foo', {
				lifecycle:{
					inserted: function(){
						inserted = true;
					}
				}
			});

			testBox.innerHTML = '<x-foo id="foo"></x-foo>';

			waitsFor(function(){
				return inserted;
			}, "inserted should fire", 1000);

			runs(function(){
				expect(inserted).toEqual(true);
				expect(document.getElementById('foo')).toBeDefined();
				
			});
		});
	});
});
