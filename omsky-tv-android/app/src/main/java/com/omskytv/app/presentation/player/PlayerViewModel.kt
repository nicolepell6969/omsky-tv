package com.omskytv.app.presentation.player

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.omskytv.app.domain.model.Channel
import com.omskytv.app.domain.model.Stream
import com.omskytv.app.domain.repository.ChannelRepository
import com.omskytv.app.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class PlayerViewModel @Inject constructor(
    private val repository: ChannelRepository
) : ViewModel() {

    private val _state = mutableStateOf(PlayerState())
    val state: State<PlayerState> = _state

    fun loadChannel(channelId: String) {
        viewModelScope.launch {
            // Get channel info
            val channel = repository.getChannelById(channelId)
            _state.value = _state.value.copy(channel = channel)

            // Get streams
            repository.getStreamsByChannel(channelId).onEach { result ->
                when (result) {
                    is Resource.Success -> {
                        _state.value = _state.value.copy(
                            streams = result.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _state.value = _state.value.copy(
                            isLoading = false,
                            error = result.message ?: "Failed to load streams"
                        )
                    }
                    is Resource.Loading -> {
                        _state.value = _state.value.copy(isLoading = true)
                    }
                }
            }.launchIn(viewModelScope)
        }
    }
}

data class PlayerState(
    val channel: Channel? = null,
    val streams: List<Stream> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)
