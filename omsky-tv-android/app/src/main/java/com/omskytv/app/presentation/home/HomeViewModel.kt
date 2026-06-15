package com.omskytv.app.presentation.home

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.omskytv.app.domain.model.Channel
import com.omskytv.app.domain.repository.ChannelRepository
import com.omskytv.app.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repository: ChannelRepository
) : ViewModel() {

    private val _state = mutableStateOf(HomeState())
    val state: State<HomeState> = _state

    init {
        loadChannels()
    }

    fun onEvent(event: HomeEvent) {
        when (event) {
            is HomeEvent.SearchQueryChanged -> {
                _state.value = _state.value.copy(searchQuery = event.query)
            }
            is HomeEvent.CategorySelected -> {
                _state.value = _state.value.copy(selectedCategory = event.category)
            }
            is HomeEvent.CountrySelected -> {
                _state.value = _state.value.copy(selectedCountry = event.country)
            }
            HomeEvent.ClearFilters -> {
                _state.value = _state.value.copy(
                    searchQuery = "",
                    selectedCategory = null,
                    selectedCountry = null
                )
            }
        }
    }

    private fun loadChannels() {
        viewModelScope.launch {
            repository.getChannels().onEach { result ->
                when (result) {
                    is Resource.Success -> {
                        _state.value = _state.value.copy(
                            channels = result.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _state.value = _state.value.copy(
                            isLoading = false,
                            error = result.message ?: "An unexpected error occurred"
                        )
                    }
                    is Resource.Loading -> {
                        _state.value = _state.value.copy(isLoading = true)
                    }
                }
            }.launchIn(viewModelScope)
        }
    }

    fun getFilteredChannels(): List<Channel> {
        var filtered = _state.value.channels

        // Filter by search query
        if (_state.value.searchQuery.isNotBlank()) {
            val query = _state.value.searchQuery.lowercase()
            filtered = filtered.filter {
                it.name.lowercase().contains(query) ||
                it.categories.any { cat -> cat.lowercase().contains(query) } ||
                it.country.lowercase().contains(query)
            }
        }

        // Filter by category
        _state.value.selectedCategory?.let { category ->
            filtered = filtered.filter { it.categories.contains(category) }
        }

        // Filter by country
        _state.value.selectedCountry?.let { country ->
            filtered = filtered.filter { it.country == country }
        }

        return filtered
    }

    fun getCategories(): List<String> {
        return _state.value.channels
            .flatMap { it.categories }
            .distinct()
            .sorted()
    }

    fun getCountries(): List<String> {
        return _state.value.channels
            .map { it.country }
            .distinct()
            .sorted()
    }
}

data class HomeState(
    val channels: List<Channel> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val searchQuery: String = "",
    val selectedCategory: String? = null,
    val selectedCountry: String? = null
)

sealed class HomeEvent {
    data class SearchQueryChanged(val query: String) : HomeEvent()
    data class CategorySelected(val category: String?) : HomeEvent()
    data class CountrySelected(val country: String?) : HomeEvent()
    object ClearFilters : HomeEvent()
}
