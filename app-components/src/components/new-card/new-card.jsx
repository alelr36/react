var React = require('react'),
    Moment = require('moment'),
	Firebase = require('firebase');

NewCard = React.createClass ({

    getInitialState: function () {
        this.users = [];
        return {
            imageSrc: 'http://notsportscenter.com/wp-content/uploads/2014/03/MutomboWag.png',
            users: []
        }
    },

    componentWillMount: function () {
        this.firebaseRefs = new Firebase("https://mutombo-users.firebaseio.com/");

        this.firebaseRefs.on('child_added', function(data) {
            this.users.push({
                data: data.val()
            });
            this.setState({
                users: this.users
            });
        }.bind(this));
    },

    render: function () {
        var users = [];
        this.state.users.forEach( function(userList) {
            users.push(<option value={userList.data.username}>{userList.data.displayName}</option>);
        });

		return (
			<div className='new-card-container'>
				<input className='pretty-button' type='button' value='New Card' onClick={this.showNewCard}/>
                <div className='new-card hidden' id='new-card-box'>
                    <select id='usersSelect' onChange={this.getImage}>
                        <option value='select' selected={true}>Seleccione Usuario</option>
                        {users}
                    </select>
                    <select id='cat'>
                        <option value='mutombo' selected={true}>Mutombo</option>
                        <option value='mugre'>Mugre</option>
                        <option value='reunion'>Llamada en Reunión</option>
                        <option value='demo'>Demo Exitosa</option>
                        <option value='ingreso'>Ingreso</option>
                        <option value='cumple'>Cumpleaños</option>
                        <option value='despedida'>Despedida</option>
                        <option value='buildFailure'>Build Failure</option>
                        <option value='otra'>Otra...</option>
                    </select>
                    <img className='default-image' src={this.state.imageSrc} />
    				<input className='button' type='button' value='Add' onClick={this.addCard}/>
                </div>
            </div>
		)
	},

    getImage: function (e) {
        if(document.getElementById('usersSelect').selectedIndex === 0) {
            this.setState({
                    imageSrc: 'http://notsportscenter.com/wp-content/uploads/2014/03/MutomboWag.png'
            });
        }
        else {
            this.setState({
                    imageSrc: 'https://graph.facebook.com/' + document.getElementById('usersSelect').value + '/picture?width=150&height=150'
            });
        }
    },

    resetForm: function () {
        document.getElementById('usersSelect').selectedIndex = 0;
        document.getElementById('cat').selectedIndex = 0;
        this.getImage();
    },

    showNewCard: function (e) {
        var element = document.getElementById('new-card-box');
        var background = document.getElementById('background-overlay');
        if (!element.className.match('hidden')) {
            element.classList.add('hidden');
            background.classList.add('hidden');
        }
        else {
            element.classList.remove('hidden');
            background.classList.remove('hidden');
        }
    },

	addCard: function () {
        if (!document.getElementById('usersSelect').selectedIndex == 0) {
    		firebaseRefs = new Firebase('https://mutombo-cards.firebaseio.com/');

    		firebaseRefs.push({
    			name: document.getElementById('usersSelect').options[document.getElementById('usersSelect').selectedIndex].innerHTML,
    			user: document.getElementById('usersSelect').value,
    			cat: document.getElementById('cat').options[document.getElementById('cat').selectedIndex].innerHTML,
    			date: Moment().format('MM/DD/YYYY, HH:mm')
    		});
            this.showNewCard();
        }
        else {
            alert('Solo Chuck Norris puede mutombear a Mutombo!');
        }

        this.resetForm()
	}
});

module.exports = NewCard;
