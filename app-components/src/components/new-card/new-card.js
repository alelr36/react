var React = require('react'),
    Moment = require('moment'),
	Firebase = require('firebase');

NewCard = React.createClass ({

    getInitialState: function () {
        this.users = [];
        return {
            imageSrc: '/assets/img/panched.gif',
            users: []
        };
    },

    componentWillMount: function () {
        var firebaseUsersRef = new Firebase("http://mutombo-users.firebaseio.com/");

        firebaseUsersRef.on('child_added', function(data) {
            this.users.push({
                id: data.key(),
                data: data.val()
            });

            this.setState({
                users: this.users
            });

        }.bind(this));
    },

    render: function () {
        return (
			<div className='button-container'>
				<input className='pretty-button' type='button' value='Nueva Card' onClick={this.showNewCard}/>
                <div className='new-card hidden' id='new-card-box'>

                    {this.renderUsersSelect()}

                    {this.renderCatSelect()}
                    
                    <input id='otherReason' maxLength='50' className='other-reason hidden' type='text' placeholder='Especificar...' />                        
                    
                    <img id="selectedImage" className='default-image' src={this.state.imageSrc} />
                    <input className='midnight-blue-flat-button' type='button' value='Agregar' onClick={this.addCard}/>
                </div>
            </div>
		);
	},

    renderUsersSelect: function () {
        return (
            <select id='usersSelect' className='dropdown' defaultValue='select' onChange={this.getImage}>
                <option value='select'>Usuarios</option>
                {this.renderUsers()}
            </select>
        );
    },

    renderUsers: function () {
        var users = [];
        this.state.users.forEach(function (user) {
            users.push(<option key={user.id} value={user.data.username}>{user.data.displayName}</option>);
        });

        return users;
    },

    renderCatSelect: function () {
        return (
            <select id='cat' className='dropdown' defaultValue='panched' onChange={this.showOtherInput}>
                <option value='panched'>Panched</option>
                <option value='mugre'>Mugre</option>
                <option value='reunion'>Llamada en Reunión</option>
                <option value='demo'>Demo Exitosa</option>
                <option value='ingreso'>Ingreso</option>
                <option value='cumple'>Cumpleaños</option>
                <option value='despedida'>Despedida</option>
                <option value='buildFailure'>Build Failure</option>
                <option value='otra'>Otra...</option>
            </select>
      );
    },

    getImage: function () {
        if(document.getElementById('usersSelect').selectedIndex === 0) {
            this.setState({
                    imageSrc: '/assets/img/panched.gif'
            });
        } else {
            this.setState({
                    imageSrc: 'https://graph.facebook.com/' + document.getElementById('usersSelect').value + '/picture?width=150&height=150'
            });
        }
    },    

    showOtherInput: function () {
        var select = document.getElementById('cat');
        var inputDiv = document.getElementById('otherReason');
        
        if(select.value === "otra") {
            inputDiv.classList.remove('hidden');
        } else {
            inputDiv.classList.add('hidden');        
        }    
    },

    showNewCard: function () {
        var element = document.getElementById('new-card-box');
        var background = document.getElementById('background-overlay');
        if (!element.className.match('hidden')) {
            element.classList.add('hidden');
            element.classList.remove('animate');
            background.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
            element.classList.add('animate');
            background.classList.remove('hidden');
        }        

        this.closeLogTerminal();
    },

    closeLogTerminal: function () {
        var element = document.getElementById('logTerminal');

        if (!element.className.match('hidden')) {
            element.classList.add('hidden');
        }
    },

	addCard: function () {
        var pushed = false;
        var otherCatEmpty = false;
        var category = document.getElementById('cat').options[document.getElementById('cat').selectedIndex].innerHTML;
		var firebaseCardsRef = new Firebase('http://mutombo-cards.firebaseio.com/');

        if (document.getElementById('usersSelect').selectedIndex !== 0) {

            if(document.getElementById('cat').value === "otra") {             
               
                if(document.getElementById('otherReason').value.trim() === "") {
                    alert('Especifique una razon para panchear.');
                    otherCatEmpty = true;
                } else {
                    category = document.getElementById('otherReason').value;
                    otherCatEmpty = false;
                }
            }

            if(!otherCatEmpty) {
                firebaseCardsRef.push({
        			name: document.getElementById('usersSelect').options[document.getElementById('usersSelect').selectedIndex].innerHTML,
        			user: document.getElementById('usersSelect').value,
        			cat: category,
        			date: Moment().zone('-03:00').format('MM/DD/YYYY, HH:mm')
        		});
                this.showNewCard();         
                pushed = true;   
            }
        } else {
            alert('Ya fue suficientemente pancheada la pobre chica...');
        }

        if (pushed) {
            this.logAdd(category);            
        }

        if(!otherCatEmpty) {
            this.props.fnReset();
        }
	},    

    logAdd: function (category) {
        var firebaseLogRef = new Firebase('http://mutombo-log.firebaseio.com/');

        firebaseLogRef.push({
            type: "Adding card",
            entry: "Victima: " + document.getElementById('usersSelect').options[document.getElementById('usersSelect').selectedIndex].innerHTML,
            reason: category,
            date: Moment().zone('-03:00').format('DD/MM/YYYY, HH:mm')
        });
    }
});

module.exports = NewCard;
