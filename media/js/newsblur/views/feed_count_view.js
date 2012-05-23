NEWSBLUR.Views.FeedCount = Backbone.View.extend({
    
    className: 'feed_counts_floater',
    
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change:ps', this.render);
        this.model.bind('change:nt', this.render);
        this.model.bind('change:ng', this.render);
    },
    
    render: function() {
        $(this.el).html($(this.render_to_string()));
        return this;
    },
    
    render_to_string: function() {
        var feed = this.model;
        var unread_class = "";
        if (feed.get('ps')) {
            unread_class += ' unread_positive';
        }
        if (feed.get('nt')) {
            unread_class += ' unread_neutral';
        }
        if (feed.get("ng")) {
            unread_class += ' unread_negative';
        }
        
        var $floater = _.template('\
        <div class="<%= unread_class %>">\
          <span class="unread_count unread_count_positive <% if (feed.get("ps")) { %>unread_count_full<% } else { %>unread_count_empty<% } %>">\
            <%= feed.get("ps") %>\
          </span>\
          <span class="unread_count unread_count_neutral <% if (feed.get("nt")) { %>unread_count_full<% } else { %>unread_count_empty<% } %>">\
            <%= feed.get("nt") %>\
          </span>\
          <span class="unread_count unread_count_negative <% if (feed.get("ng")) { %>unread_count_full<% } else { %>unread_count_empty<% } %>">\
            <%= feed.get("ng") %>\
          </span>\
        </div>\
        ', {
          feed         : feed,
          unread_class : unread_class
        });
        
        return $floater;
    },
    
    // ===========
    // = Actions =
    // ===========
    
    center: function() {
        var i_width = this.$el.width();
        var o_width = NEWSBLUR.reader.$s.$story_taskbar.width();
        var left = (o_width / 2.0) - (i_width / 2.0);
        console.log(["center", left, i_width, o_width]);
        this.$el.css({'left': left});
    },
    
    flash: function() {
        var $floater = this.$el;
        
        _.defer(function() {
            $floater.animate({'opacity': 1}, {'duration': 250, 'queue': false});
            _.delay(function() {
                $floater.animate({'opacity': .2}, {'duration': 250, 'queue': false});
            }, 400);
        });        
    },
    
    fall: function() {
        var $floater = this.$el;
        
        _.delay(function() {
            $floater.animate({
                'top': $('#story_taskbar').height()
            }, {
                'duration': 500, 
                'queue': false,
                'easing': 'easeOutQuint'
            });
        }, 500);
    }
    
});